"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { fetchSpaceData } from "../action"

const chartConfig = {
  testimonialsCount: {
    label: "Testimonials",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TestimonialsChart() {
  const [chartData, setChartData] = useState<never[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSpaceData()
        if (data && Array.isArray(data) && data.length > 0) {
          setChartData(data as never[])
        }
      } catch (error) {
        console.error('Error in TestimonialsChart:', error)
        setError('An error occurred while loading chart data.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])


  if (loading) return <ChartSkeleton />
  if (error) return <ChartError error={error} />

  return (
    <>
      {chartData.length === 0 ? (

        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              No data available for the chart.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>
              Add testimonials to see the chart.
            </CardDescription>
          </CardFooter>
        </Card>
      ) :
        (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 25,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}

              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="testimonialsCount" fill="var(--color-testimonialsCount)" radius={8}>
                <LabelList
                  dataKey="testimonialsCount"
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )
      }
    </>
  )
}


const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}


function ChartError({ error }: { error: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Error</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-red-500">{error}</div>
      </CardContent>
    </Card>
  )
}