import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class VisitorCard {

    @PrimaryColumn()
    numOnCard: string;

    @Column({unique: true})
    token: string;

    @Column({ default: false })
    occupied: boolean;

}
