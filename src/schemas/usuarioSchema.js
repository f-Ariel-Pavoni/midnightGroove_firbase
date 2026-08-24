import { z } from "zod";

export const usuarioSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(12, "El nombre no puede superar los 12 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, "El nombre solo puede contener letras"),

  apellido: z
    .string()
    .trim()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(12, "El apellido no puede superar los 12 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, "El apellido solo puede contener letras"),

  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio")
    .email("Debe ingresar un email válido"),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, "La contraseña no puede superar los 20 caracteres")
    .regex(/^\S+$/, "La contraseña no puede contener espacios"),

  rol: z.enum(["admin", "usuario"], {
    error: "Debe seleccionar un rol válido",
  }),
});
