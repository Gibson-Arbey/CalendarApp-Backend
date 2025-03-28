import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty({message: 'El correo es obligatorio'})
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, {message: 'La contraseña debe contar con minimo 6 caracteres'})
  password: string;

}
