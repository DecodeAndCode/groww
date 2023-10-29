import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface ChartComponentProps {
    data: Array<{ time: string; value: number }>;
    colors?: {
        backgroundColor?: string;
        lineColor?: string;
        textColor?: string;
        areaTopColor?: string;
        areaBottomColor?: string;
    };
}

export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef<HTMLDivElement | null>(null); // Define the type of the ref

    useEffect(() => {
        let chart: any = null;

        const handleResize = () => {
            if (chartContainerRef.current && chart) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        if (chartContainerRef.current && !chart) {
            chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });

            if (chart) {
                chart.timeScale().fitContent();

                const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
                newSeries.setData(data);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            if (chart) {
                chart.remove();
            }
        };
    }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

    return (
        <div style={{
            marginTop: 30,
            marginLeft: 255,
            marginRight: 255,
        }}>
            <div style={{
                border: "solid dimgray 1px",
                borderRadius: "10px",
                overflow: 'hidden',
            }}
                 ref={chartContainerRef}
            />
        </div>
    );
};

export const initialData = [
    {time: '2018-12-22', value: 32.51},
    {time: '2018-12-23', value: 31.11},
    {time: '2018-12-24', value: 27.02},
    {time: '2018-12-25', value: 27.32},
    {time: '2018-12-26', value: 25.17},
    {time: '2018-12-27', value: 28.89},
    {time: '2018-12-28', value: 25.46},
    {time: '2018-12-29', value: 23.92},
    {time: '2018-12-30', value: 22.68},
    {time: '2018-12-31', value: 22.67},
];

export function Chart(props: ChartComponentProps) {
    return (
        <ChartComponent {...props} data={initialData}></ChartComponent>
    );
}
