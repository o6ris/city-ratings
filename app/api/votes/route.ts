import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const rating_id = request.nextUrl.searchParams.get("review");

  // Get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Count up and down votes for this rating
  const { data: allVotes, error: countError } = await supabase
    .from("rating_votes")
    .select("user_id, rating_id, vote_type", { count: "exact" })
    .eq("rating_id", rating_id);

  if (countError) {
    return NextResponse.json(
      { error: "Failed to count votes", message: countError.message },
      { status: 500 }
    );
  }

  const hasVoted = allVotes.find((v) => {
    return v.user_id === user.id;
  });

  // Group counts manually
  const voteCounts = {
    rating_id: allVotes[0].rating_id,
    user_id: allVotes.map((v) => v.user_id),
    up: allVotes.filter((v) => v.vote_type === "up").length,
    down: allVotes.filter((v) => v.vote_type === "down").length,
    has_voted: hasVoted ? hasVoted.vote_type : null,
  };

  return NextResponse.json(voteCounts);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();
  const { rating_id, vote_type } = body;

  // Get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the user already voted for this rating
  const { data: existingVote, error: fetchError } = await supabase
    .from("rating_votes")
    .select("*")
    .eq("rating_id", rating_id)
    .eq("user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // If error isn't "no rows found", return error
    return NextResponse.json(
      { error: "Error checking vote", message: fetchError.message },
      { status: 500 }
    );
  }

  const countVotes = async () => {
    // ✅ Count up and down votes for this rating
    const { data: allVotes, error: countError } = await supabase
      .from("rating_votes")
      .select("user_id, rating_id, vote_type", { count: "exact" })
      .eq("rating_id", rating_id);

    if (countError) {
      return NextResponse.json(
        { error: "Failed to count votes", message: countError.message },
        { status: 500 }
      );
    }

    const hasVoted = allVotes.find((v) => v.user_id === user.id);

    const voteCounts: {
      rating_id: string | null;
      user_id: string[];
      up: number;
      down: number;
      has_voted: "up" | "down" | null;
    } = {
      rating_id: null,
      user_id: [],
      up: 0,
      down: 0,
      has_voted: null,
    };

    if (allVotes.length > 0) {
      voteCounts.user_id = allVotes.map((v) => v.user_id);
      voteCounts.up = allVotes.filter((v) => v.vote_type === "up").length;
      voteCounts.down = allVotes.filter((v) => v.vote_type === "down").length;
      voteCounts.has_voted = hasVoted ? hasVoted.vote_type : null;
    }

    return voteCounts;
  };

  if (existingVote) {
    if (existingVote.vote_type === vote_type) {
      // Same vote → remove it (toggle off)
      const { data, error: deleteError } = await supabase
        .from("rating_votes")
        .delete()
        .eq("id", existingVote.id);

      if (deleteError) {
        return NextResponse.json(
          { error: "Failed to remove vote", message: deleteError.message },
          { status: 500 }
        );
      }

      const voteCounts = await countVotes();

      return NextResponse.json({
        success: true,
        action: "deleted",
        data,
        voteCounts,
      });
    } else {
      // Different vote → update it
      const { data, error: updateError } = await supabase
        .from("rating_votes")
        .update({ vote_type })
        .eq("id", existingVote.id)
        .select();

      if (updateError) {
        return NextResponse.json(
          { error: "Failed to update vote", message: updateError.message },
          { status: 500 }
        );
      }
      const voteCounts = await countVotes();
      return NextResponse.json({
        success: true,
        action: "updated",
        data,
        voteCounts,
      });
    }
  } else {
    // No existing vote → insert new one
    const { data, error } = await supabase
      .from("rating_votes")
      .insert([{ rating_id, vote_type, user_id: user.id }])
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Failed to submit vote", message: error.message },
        { status: 500 }
      );
    }
    const voteCounts = await countVotes();
    return NextResponse.json({
      success: true,
      action: "inserted",
      data,
      voteCounts,
    });
  }
}
