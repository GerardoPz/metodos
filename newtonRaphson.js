function newtonRaphson(fStr, dfStr, x0, tol = 1e-6, maxIter = 100) {
    let iteraciones = [];
    
    for (let i = 0; i < maxIter; i++) {
      // Evaluar la función y su derivada
      let f_x0 = eval(fStr.replace(/x/g, x0));
      let df_x0 = eval(dfStr.replace(/x/g, x0));
      
      if (df_x0 === 0) {
        throw new Error("La derivada se ha vuelto cero.");
      }
      
      let x1 = x0 - f_x0 / df_x0;
      iteraciones.push({ iteracion: i + 1, x0: x0.toFixed(6), x1: x1.toFixed(6), f_x0: f_x0.toFixed(6) });
      
      if (Math.abs(x1 - x0) < tol) {
        return { iteraciones, raiz: x1 };
      }
      x0 = x1;
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
    const encabezados = ["Iteración", "x0", "x1"];
    encabezados.forEach((encabezado, index) => {
      ctx.fillText(encabezado, 50 + index * 100, 50);
    });
  
    // Mostrar resultados
    iteraciones.forEach((iteracion, fila) => {
      ctx.fillText(iteracion.iteracion, 50, 70 + fila * 20);
      ctx.fillText(iteracion.x0, 150, 70 + fila * 20);
      ctx.fillText(iteracion.x1, 250, 70 + fila * 20);
    });
  
    // Mostrar raíz aproximada
    ctx.fillText(`Raíz aproximada: ${raiz.toFixed(6)}`, 50, 70 + iteraciones.length * 20 + 20);
  }
  