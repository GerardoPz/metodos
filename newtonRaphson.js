function newtonRaphson(fStr, dfStr, x0, tol = 1e-6, maxIter = 100) {
  let iteraciones = [];

  for (let i = 0; i < maxIter; i++) {
      // Reemplazar `^` por `**` y hacer los ajustes de multiplicación
      fStr = fStr.replace(/(\d+)x/g, '$1*x'); // Reemplaza números seguidos de x por números*x
      dfStr = dfStr.replace(/(\d+)x/g, '$1*x'); // Lo mismo para la derivada
      
      fStr = fStr.replace(/x\^/g, 'x**'); // Cambiar `x^` a `x**`
      dfStr = dfStr.replace(/x\^/g, 'x**'); // Lo mismo para la derivada
      
      fStr = fStr.replace(/\^/g, '**'); // Cambiar `^` a `**` para todas las potencias
      dfStr = dfStr.replace(/\^/g, '**'); // Lo mismo para la derivada

      // Evaluar la función y su derivada
      let f_x0 = eval(fStr.replace(/x/g, x0));
      let df_x0 = eval(dfStr.replace(/x/g, x0));

      if (df_x0 === 0) {
          throw new Error("La derivada se ha vuelto cero.");
      }

      // Calcular el nuevo valor
      let x1 = x0 - (f_x0 / df_x0);
      iteraciones.push({ iteracion: i + 1, x0: x0.toFixed(6), x1: x1.toFixed(6), f_x0: f_x0.toFixed(6) });

      // Verificar la convergencia
      if (Math.abs(x1 - x0) < tol) {
          return { iteraciones, raiz: x1 }; // Se considera convergente
      }
      x0 = x1; // Actualizar x0 para la siguiente iteración
  }

  return { iteraciones, raiz: x0 }; // Retornar última raíz aproximada
}

function calcularNewtonRaphson() {
  const fStr = document.getElementById("formula").value;
  const dfStr = document.getElementById("derivadaFormula").value;
  let x0 = parseFloat(document.getElementById("valorInicial").value);

  try {
      const { iteraciones, raiz } = newtonRaphson(fStr, dfStr, x0);
      mostrarResultados(iteraciones, raiz);
  } catch (error) {
      alert(error.message);
  }
}

function mostrarResultados(iteraciones, raiz) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Arial";

  // Encabezados de la tabla
  const encabezados = ["Iteración", "x0", "x1", "f(x0)"];
  encabezados.forEach((encabezado, index) => {
      ctx.fillText(encabezado, 50 + index * 100, 50);
  });

  // Mostrar resultados
  iteraciones.forEach((iteracion, fila) => {
      ctx.fillText(iteracion.iteracion, 50, 70 + fila * 20);
      ctx.fillText(iteracion.x0, 150, 70 + fila * 20);
      ctx.fillText(iteracion.x1, 250, 70 + fila * 20);
      ctx.fillText(iteracion.f_x0, 350, 70 + fila * 20);
  });

  // Mostrar raíz aproximada
  ctx.fillText(`Raíz aproximada: ${raiz.toFixed(6)}`, 50, 70 + iteraciones.length * 20 + 20);
}
