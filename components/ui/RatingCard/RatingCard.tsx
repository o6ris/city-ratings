"use client";

import Link from "next/link";
import useVotes from "@/modules/hooks/votes/useVotes";
import Modal from "@/components/core/modal/Modal";
import Icon from "@/components/core/Icons/Icon";
import iconDict from "@/modules/utils/iconDict";
import { Review } from "@/types/review";
import DeleteRatingbutton from "../Buttons/DeleteRatingButton";

export default function RatingCard({ review }: { review: Review }) {
  const { postVote, voteCounts } = useVotes(review.id);
  const maxCharsComment = 200; // TODO: or however many characters fit into your h-32
  const maxChartUsername = 20; // TODO: or however many characters fit into full width
  const isCommentLong = review.comment.length > maxCharsComment;
  const shortComment = isCommentLong
    ? review.comment.slice(0, maxCharsComment).trim() + "..."
    : review.comment;
  const username = review.user.name ?? "Anonymous";
  const isUsernameLong = username.length > maxChartUsername;
  const shortUsername = isUsernameLong
    ? username.slice(0, maxChartUsername).trim() + "..."
    : username;

  console.log("review", review);

  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral text-neutral-content rounded-2xl w-full shadow-lg flex flex-col items-center justify-center">
      {/* header */}
      <section className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] bg-primary rounded-full"></div>
          <p className="text-primary">
            {review.is_user_review ? "You" : shortUsername}
          </p>
        </div>
        <div>
          <span className="text-primary !font-bold !text-2xl">
            {review.average_rating.toFixed(2)}
          </span>
          <span className="text-primary">/10</span>
        </div>
      </section>
      {/* Criterias  */}
      <section className="grid grid-cols-4 w-full gap-2 md:grid-cols-4 md:gap-6  ">
        {Object.entries(review.criterias).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200 py-2 px-4"
            >
              <Icon
                name={iconDict[key]}
                size={20}
                strokeWidth={2}
                color="#480201"
              />
              <span className="!font-bold text-primary">{value}</span>
            </div>
          );
        })}
      </section>
      {/* Comment */}
      <section className="flex justify-start w-full">
        <div className="text-primary h-32 w-full break-words overflow-hidden">
          <p className="whitespace-pre-wrap">
            {`" `}
            {shortComment}
            {isCommentLong && (
              <Modal
                modalId={`modal-review-${review.id}`}
                triggerBtnContent="view more"
                triggerBtnStyle="text-secondary"
                content={
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        <div className="w-[20px] h-[20px] bg-primary rounded-full"></div>
                        <p className="text-primary">{review.user.name}</p>
                      </div>
                      <div>
                        <span className="text-primary !font-bold !text-2xl">
                          {review.average_rating.toFixed(1)}
                        </span>
                        <span className="text-primary">/10</span>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                }
              />
            )}
            {` "`}
          </p>
        </div>
      </section>
      {/* footer */}
      <section className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              postVote({
                rating_id: review.id,
                vote_type: "up",
              })
            }
            className={`${
              voteCounts?.has_voted === "up" ? "btn-secondary" : ""
            } btn rounded-full flex items-center gap-2`}
          >
            <span className="text-primary">
              {voteCounts ? voteCounts.up : 0}
            </span>
            <Icon name="ThumbsUp" strokeWidth={2} size={16} color="#480201" />
          </button>
          <button
            onClick={() =>
              postVote({
                rating_id: review.id,
                vote_type: "down",
              })
            }
            className={`${
              voteCounts?.has_voted === "down" ? "btn-secondary" : ""
            } btn rounded-full flex items-center gap-2`}
          >
            <span className="text-primary">
              {voteCounts ? voteCounts.down : 0}
            </span>
            <Icon name="ThumbsDown" strokeWidth={2} size={16} color="#480201" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {review.is_user_review && (
            <div className="flex items-center gap-2">
              <Link
                href={`/district/${review.district_id}/rating`}
                className="bg-transparent border border-1 border-primary rounded-xl p-2"
              >
                <Icon name="Pencil" color="#480201" size={16} strokeWidth={2} />
              </Link>
              <DeleteRatingbutton
                reviewId={review.id}
                districtId={review.district_id}
              />
            </div>
          )}
          <p className="text-xs text-primary !text-xsmall">
            {new Date(review.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
