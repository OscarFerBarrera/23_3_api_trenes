import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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
    price: string;

  @Column()
    train: string;

  @OneToMany(type => User, user => user.team, { cascade: true })
    users: User[];
}
