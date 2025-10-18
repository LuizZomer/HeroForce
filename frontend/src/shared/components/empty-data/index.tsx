import { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export const EmptyData = ({
  icon: Icon,
  content,
}: {
  icon: LucideIcon;
  content?: React.ReactNode;
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>Nenhum dado encontrado!</EmptyTitle>
      </EmptyHeader>
      {content && <EmptyContent>{content}</EmptyContent>}
    </Empty>
  );
};
