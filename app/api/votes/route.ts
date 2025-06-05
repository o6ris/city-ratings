import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const rating_id = request.nextUrl.searchParams.get("review")

  // ✅ Count up and down votes for this rating
  const { data: allVotes, error: countError } = await supabase
    .from("rating_votes")
    .select("vote_type", { count: "exact" })
    .eq("rating_id", rating_id);

  if (countError) {
    return NextResponse.json(
      { error: "Failed to count votes", message: countError.message },
      { status: 500 }
    );
  }

  // Group counts manually
  const voteCounts = {
    up: allVotes.filter((v) => v.vote_type === "up").length,
    down: allVotes.filter((v) => v.vote_type === "down").length,
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
      .select("vote_type", { count: "exact" })
      .eq("rating_id", rating_id);

    if (countError) {
      return NextResponse.json(
        { error: "Failed to count votes", message: countError.message },
        { status: 500 }
      );
    }

    // Group counts manually
    const voteCounts = {
      up: allVotes.filter((v) => v.vote_type === "up").length,
      down: allVotes.filter((v) => v.vote_type === "down").length,
    };
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
      console.log("voteCounts delete", voteCounts, data);

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
      console.log("voteCounts update", voteCounts, data);
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
    console.log("voteCounts add", voteCounts, data);
    return NextResponse.json({
      success: true,
      action: "inserted",
      data,
      voteCounts,
    });
  }
}
