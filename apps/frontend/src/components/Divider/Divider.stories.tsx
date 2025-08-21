import { Divider } from "./Divider";

export default {
  title: "Components/Divider",
};

export const DividerStory = () => (
  <div className="flex justify-center items-center min-h-screen py-400">
    <div className="flex items-center gap-100">
      {/* Vertical Divider */}
      <Divider orientation="vertical" />

      {/* Horizontal Divider */}
      <Divider orientation="horizontal" />
    </div>
  </div>
);

DividerStory.storyName = "Divider";
