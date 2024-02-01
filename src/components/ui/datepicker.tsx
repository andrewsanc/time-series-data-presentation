import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required",
  }),
});

export function DatePickerForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedDate = data.date;

    // Check if we have a valid date object
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      // Set beginning and end date intervals
      const begin = format(selectedDate, "yyyy-MM-dd") + "T00:00:00Z";
      const end = format(selectedDate, "yyyy-MM-dd") + "T23:59:59Z";
      const url = `/data?begin=${begin}&end=${end}`;

      navigate(url);
    } else {
      alert("Invalid date selected");
    }
  }

  useEffect(() => {
    // Parse the query parameters from the url
    const searchParams = new URLSearchParams(location.search);
    const end = searchParams.get("end");
    const date = end ? new Date(end) : null;

    // If date can be derived from the params, update our datepicker form
    if (FormSchema.safeParse({ date }).success) {
      form.setValue("date", date!);
    } else {
      return;
    }
  }, [location.search, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
