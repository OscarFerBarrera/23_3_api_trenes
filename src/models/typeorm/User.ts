import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Travel } from "./Travel";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    name: string;

  @Column()
    lastName: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    dni: string;

  @Column()
    nationality: string;

  @Column()
    birthdate: string;

  @Column()
    Treatment: string;

  @OneToMany(type => Travel, travel => travel.users)
  team: Travel;
}
