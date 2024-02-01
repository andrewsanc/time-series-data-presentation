import { DatePickerForm } from "@/components/ui/datepicker";
import { useEffect, useMemo, useState } from "react";
import { FormData } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/columns";
import { SimpleLineChart } from "@/components/ui/simple-line-chart";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const [data, setData] = useState<string | null>(null);

  async function fetchDataFromApi(data: FormData) {
    try {
      const { begin, end } = data;
      const url = `https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`;
      const response = await fetch(url, {
        method: "GET",
      });

      const responseDataText = await response.text();
      // Currently I'm not formatting the data, just using it as is.
      // Follow up, does the data need to be formatted?

      setData(responseDataText);
    } catch (err) {
      alert(`Error fetching data: ${err}`);
    }
  }

  const processedData = useMemo(() => {
    return data
      ?.split("\n")
      .map((data) => {
        const [time, value] = data.split(" ");

        // Not sure if we need to filter values that don't have a value
        // I didn't due to us maybe needing to display potential signal dropoffs?
        // .filter(({ value }) => value !== "");

        return {
          time,
          value: value === "" ? "0" : value,
        };
      })
      .filter(({ value }) => value !== undefined);
  }, [data]);

  useEffect(() => {
    // Parse the query parameters from the url
    const searchParams = new URLSearchParams(location.search);
    const begin = searchParams.get("begin");
    const end = searchParams.get("end");

    // Make network request with given parameters
    if (begin && end) {
      fetchDataFromApi({ begin, end });
    }
  }, [location.search]);

  return (
    <div className='flex flex-col m-10'>
      <DatePickerForm />
      {!data ? (
        <div className='flex justify-center items-center my-10'>
          <p className='text-2xl font-semibold text-slate-700'>
            Select a date to begin
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-20 my-10'>
          <SimpleLineChart data={processedData ?? []} />
          <DataTable columns={columns} data={processedData ?? []} />
        </div>
      )}
    </div>
  );
}
