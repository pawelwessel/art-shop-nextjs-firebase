import ClientFormWrapper from "../PieceForm/ClientFormWrapper";

export default function PieceForm({
  openedPiece,
  setOpenedPiece,
}: {
  openedPiece: string;
  setOpenedPiece: Function;
}) {
  return (
    <div>
      <ClientFormWrapper />
    </div>
  );
}
