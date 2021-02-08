export type FormData = {
  postBody: string;
};

export default interface IAddPostDialogProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}
