import { getImageUrl } from "../../shared/storage/minio.services.ts";

export const transformEvent = async (event) => {
  let bannerUrl = null;

  if (event.bannerUrl) {
    bannerUrl = await getImageUrl(event.bannerUrl);
  }
  return {
    ...event,
    bannerUrl,
  };
};
