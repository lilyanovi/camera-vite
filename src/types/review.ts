export type TReviewByPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type TReviewByServer = {
  id: string;
  createAt: string;
}

export type TReview = TReviewByPost & TReviewByServer;

export type TReviews = TReview[];
