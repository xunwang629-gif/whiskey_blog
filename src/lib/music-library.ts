export type MusicTrack = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
};

// 维护方式：
// 1. 把音频文件放到 public/music/ 目录
// 2. 在下面修改 title / subtitle / description / src
export const drakeTracks: MusicTrack[] = [
  {
    id: "drake-1",
    title: "Marvins Room",
    subtitle: "Drake",
    description: "",
    src: "/music/marvins-room.mp3",
  },
  {
    id: "drake-2",
    title: "Jungle",
    subtitle: "Drake",
    description: "",
    src: "/music/jungle.mp3",
  },
  {
    id: "drake-3",
    title: "Passionfruit",
    subtitle: "Drake",
    description: "",
    src: "/music/passionfruit.mp3",
  },
];
