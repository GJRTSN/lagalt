export type Participant = {
  userId: number;
  forName: string;
  lastName: string;
  userRole: string;
};

export type ParticipantsProps = {
  participants: Participant[];
  removeParticipant: (projectId: number, userId: number) => Promise<void>;
  projectId: number;
  onParticipantRemoval?: () => void;
};
