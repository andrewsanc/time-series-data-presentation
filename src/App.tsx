import { DatePickerForm } from "@/components/ui/datepicker";
import { useState } from "react";
import { FormData } from "./lib/types";
import { DataTable } from "./components/ui/data-table";
import { columns } from "./components/ui/columns";
import { SimpleLineChart } from "@/components/ui/simple-line-chart";

export default function App() {
  const [data, setData] = useState<any | null>(null);

  async function handleOnFormSubmit(data: FormData) {
    const { begin, end } = data;
    const url = `https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`;
    const response = await fetch(url, {
      method: "GET",
    });

    const responseDataText = await response.text();
    const processedData = responseDataText.split("\n").map((data) => {
      const [time, value] = data.split(" ");

      return {
        time,
        value: value === "" ? "0" : value,
      };
    });
    // Not sure if we need to filter values that don't have a value
    // I didn't due to us maybe needing to display potential signal dropoffs?
    // .filter(({ value }) => value !== "");

    setData(processedData);
  }

  return (
    <div className='flex flex-col m-10'>
      <DatePickerForm handleOnFormSubmit={handleOnFormSubmit} />
      {!data ? (
        <div className='flex justify-center items-center my-10'>
          <p className='text-2xl font-semibold text-slate-700'>
            Select a date to begin
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-20 my-10'>
          <SimpleLineChart data={data} />
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
