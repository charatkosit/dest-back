import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Officer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable:true})
  address: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', default: 'normal' })
  callAttribute: string;

  @Column({nullable:true})
  idOfficer: string;

  @Column({nullable:true})
  department: string;

  @Column()
  token: string;

  @Column({nullable:true})
  embossedNumber: string;

  @Column({nullable:true})
  internalNumber: string;

  @Column()
  multiSelectFloor: string;

  @Column({nullable:true})
  active: boolean;


}
