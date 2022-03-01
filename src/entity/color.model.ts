import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "color" })
export class Color {
    @PrimaryColumn()
    id: number;
    @Column({ type: "varchar",name: "color_hex"  })
    colorHex: string;
    @Column({ type: "datetime" })
    created: Date;
}