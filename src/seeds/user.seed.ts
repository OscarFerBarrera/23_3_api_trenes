import { AppDataSource } from "../databases/typeorm-datasource";
import { User } from "../models/typeorm/User";
import { Travel } from "../models/typeorm/Travel";

export const userSeed = async (): Promise<void> => {
  // Nos conectamos a la BBDD
  const dataSource = await AppDataSource.initialize();
  console.log(`Tenemos conexión!! Conectados a ${dataSource?.options?.database as string}`);

  // Eliminamos los datos existentes
  await AppDataSource.manager.delete(User, {});
  await AppDataSource.manager.delete(Travel, {});
  console.log("Eliminados usuarios y viajes");

  // Creamos User
  const user1 = {
    name: "Cristiano",
    lastName: "Ronaldo",
    email: "asdasd@gmail.com",
    password: "12345",
    dni: "T00001",
    nationality: "Portuges",
    birthdate: "22 /1 /1980",
    Treatment: "Sr.",
  };

  const user2 = {
    firstName: "Lionel",
    lastName: "Messi",
    email: "22222@gmail.com",
    password: "aaaaa",
    dni: "X00001",
    nationality: "Argentino",
    birthdate: "10 /1 /1988",
    Treatment: "Sr.",
  };

  // Creamos las entidades
  const user1Entity = AppDataSource.manager.create(User, user1);
  const user2Entity = AppDataSource.manager.create(User, user2);

  // Las guardamos en base de datos
  await AppDataSource.manager.save(user1Entity);
  await AppDataSource.manager.save(user2Entity);


  // Creamos viajes
  const travel1 = {
    departureTime: "08:00 am",
    arrivalTime: "08:50 am",
    departureCity: "Madrid",
    arrivalCity: "Barcelona",
    price: 70,
    train: "ABC-123456",
    users: [user1Entity],
  };

  const travel2 = {
    departureTime: "09:00 am",
    arrivalTime: "10:50 am",
    departureCity: "Madrid",
    arrivalCity: "Sevilla",
    price: 120,
    train: "XXX-123456",
    users: [user2Entity],
  };
  const travel3 = {
    departureTime: "12:00 am",
    arrivalTime: "06:50 pm",
    departureCity: "Bilbao",
    arrivalCity: "Valencia",
    price: 200,
    train: "ZZZZ-123456",
    users: [user1Entity, user2Entity],
  };

  // Creamos entidad equipo
  const travelEntity1 = AppDataSource.manager.create(Travel, travel1);
  const travelEntity2 = AppDataSource.manager.create(Travel, travel2);
  const travelEntity3 = AppDataSource.manager.create(Travel, travel3);
  // Guardamos el equipo en BBDD
  await AppDataSource.manager.save(travelEntity1);
  await AppDataSource.manager.save(travelEntity2);
  await AppDataSource.manager.save(travelEntity3);

  console.log("Creados los usuarios");

  // Cerramos la conexión
  await AppDataSource.destroy();
  console.log("Cerrada conexión SQL");
};

void userSeed();
