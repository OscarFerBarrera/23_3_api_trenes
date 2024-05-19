import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    departureTime: string;

  @Column()
    arrivalTime: string;

  @Column()
  departureCity: string;

  @Column()
  arrivalCity: string;

  @Column()
    price: number;

  @Column()
    train: string;

  @ManyToOne(type => User, user => user.team, { cascade: true })
    users: User[];
}
