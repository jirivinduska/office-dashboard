import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "weather_measurement" })
export class Weather {
    @PrimaryColumn()
    id: number;
    @Column({ type: "decimal" })
    humidity: number;
    @Column({ type: "decimal" })
    pressure: number;
    @Column({ type: "decimal", name: "cpu_temp" })
    cpuTemp: number;
    @Column({ type: "decimal", name: "indoor_temp" })
    indoorTemp: number;
    @Column({ type: "decimal", name: "outdoor_temp" })
    outdoorTemp: number;
    @Column({ type: "datetime" })
    created: Date;
}