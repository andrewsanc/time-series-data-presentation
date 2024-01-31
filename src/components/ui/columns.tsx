import { TimeSeriesColumn } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TimeSeriesColumn>[] = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];
