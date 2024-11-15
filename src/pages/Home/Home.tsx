import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStateObservable } from "@react-rxjs/core";
import { FC } from "react";
import { bounties$, bounty$ } from "./bounties.state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const HomePage = () => {
  const bounties = useStateObservable(bounties$);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Bounties</CardTitle>
        <Button>Create bounty</Button>
      </CardHeader>
      <CardContent>
        {bounties ? (
          <Table>
            <TableBody>
              {bounties.map(({ keyArgs: [id] }) => (
                <BountyRow key={id} id={id} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center">Loading…</p>
        )}
      </CardContent>
    </Card>
  );
};

const BountyRow: FC<{ id: number }> = ({ id }) => {
  const bounty = useStateObservable(bounty$(id));
  if (!bounty) return null;

  return (
    <TableRow>
      <TableCell className="font-medium text-right">{id}</TableCell>
      <TableCell>{bounty.description?.asText()}</TableCell>
      <TableCell>{bounty.status.type}</TableCell>
      <TableCell className="text-right tabular-nums">
        {formatDot(bounty.value)}
      </TableCell>
    </TableRow>
  );
};

const formatDot = (value: bigint) =>
  (value / 10_000_000_000n).toLocaleString() + " DOT";
