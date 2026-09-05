import { ArrowRightIcon } from "blode-icons-react";

import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const metrics = [
  { change: "+12%", label: "Active accounts", value: "2,418" },
  { change: "+8%", label: "Monthly revenue", value: "$48,290" },
  { change: "+3%", label: "Conversion", value: "6.4%" },
];

const activity = [
  { account: "Northstar Studio", amount: "$240", status: "Paid" },
  { account: "Paper Trail", amount: "$180", status: "Paid" },
  { account: "Good Measure", amount: "$120", status: "Pending" },
];

export const DashboardOverview = () => (
  <section aria-labelledby="dashboard-heading" className="mx-auto w-full max-w-6xl p-6">
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-start gap-1">
          <Badge variant="secondary">Demo data</Badge>
          <h1 className="font-semibold text-2xl tracking-tight" id="dashboard-heading">
            Overview
          </h1>
        </div>
        <Button variant="outline">
          View reports
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardAction>
                <Badge variant="secondary">{metric.change}</Badge>
              </CardAction>
              <CardTitle className="tabular-figures text-2xl">{metric.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent payments</CardTitle>
          <CardDescription>The latest activity across your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.map((row) => (
                <TableRow key={row.account}>
                  <TableCell className="font-medium">{row.account}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "Paid" ? "success" : "secondary"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="tabular-figures text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </section>
);
