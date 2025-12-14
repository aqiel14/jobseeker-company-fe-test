import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "./ui/button";
import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  thing: string;
}

const EmptyState = ({ thing }: EmptyStateProps) => {
  const router = useRouter();
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconDownload />
        </EmptyMedia>
        <EmptyTitle>No {thing}</EmptyTitle>
        <EmptyDescription className="capitalize">
          {thing} is empty
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={() => router.refresh()}>
          <IconRefresh />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyState;
