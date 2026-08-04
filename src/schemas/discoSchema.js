import { z } from "zod";

export const discoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "El título es obligatorio.")
    .max(80, "El título no puede superar los 80 caracteres."),

  artista: z
    .string()
    .trim()
    .min(1, "El artista es obligatorio.")
    .max(80, "El artista no puede superar los 80 caracteres."),

  anio: z
    .number({
      required_error: "El año es obligatorio.",
      invalid_type_error: "El año debe ser un número.",
    })
    .min(1900, "El año debe ser mayor a 1900.")
    .max(new Date().getFullYear(), "El año no puede ser futuro."),

  genero: z
    .string()
    .trim()
    .min(1, "El género es obligatorio.")
    .max(30, "El género no puede superar los 30 caracteres.")
    .transform((valor) =>
      valor
        .split(" ")
        .map(
          (palabra) =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(),
        )
        .join(" "),
    ),

  sello: z
    .string()
    .trim()
    .max(40, "El sello no puede superar los 40 caracteres.")
    .optional(),

  descripcion: z
    .string()
    .trim()
    .max(250, "La descripción no puede superar los 250 caracteres.")
    .optional(),

  precio: z
    .number({
      invalid_type_error: "El precio debe ser un número.",
    })
    .positive("El precio debe ser mayor a cero.")
    .max(100000, "El precio está fuera de rango."),
});
