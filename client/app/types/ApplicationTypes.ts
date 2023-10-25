type Application = {
  applicationId: number;
  accepted: boolean;
  forName: string;
  userId: number;
  motivation: string;
};

type ApplicationsProps = {
  applications: Application[];
  onAccept: () => void;
};
