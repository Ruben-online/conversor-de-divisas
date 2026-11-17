import { initialize } from '@ionic/core/components';

import { defineCustomElement as defineIonApp } from '@ionic/core/components/ion-app.js';
import { defineCustomElement as defineIonContent } from '@ionic/core/components/ion-content.js';
import { defineCustomElement as defineIonButton } from '@ionic/core/components/ion-button.js';

import '@ionic/core/css/core.css';
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

import './style.css';

// ========================================
// INICIALIZACIÓN DE IONIC FRAMEWORK
// ========================================

initialize({
  mode: 'md',
});

defineIonApp();
defineIonContent();
defineIonButton();

// ========================================
// CONFIGURACIÓN DEL CONVERSOR
// ========================================

const TIPO_CAMBIO = 8;
const NUMERO_CARNET = '25008248';

// ========================================
// INTERFAZ PRINCIPAL
// ========================================

document.querySelector('#app').innerHTML = `
  <ion-app>
    <ion-content>

      <main class="app-container">

        <!-- Encabezado principal -->
        <header class="app-header">

          <div class="app-icon" aria-hidden="true">
            <span>Q</span>
            <span class="icon-divider">/</span>
            <span>$</span>
          </div>

          <h1>DivisApp - ${NUMERO_CARNET}</h1>

          <p>Conversor de Divisas</p>

        </header>

        <!-- Título del conversor -->
        <h2 class="converter-title">
          Convierte quetzales (GTQ) a dólares (USD)
        </h2>

        <!-- Tarjeta principal -->
        <section class="converter-card">

          <div class="converter-content">

            <!-- Cantidad en quetzales -->
            <div class="form-group">

              <label for="quetzales">
                Cantidad en quetzales
              </label>

              <div class="input-wrapper">

                <span class="currency-symbol">
                  Q
                </span>

                <input
                  id="quetzales"
                  type="number"
                  inputmode="decimal"
                  placeholder="0.00"
                  min="0"
                  step="any"
                />

                <span class="currency-code">
                  GTQ
                </span>

              </div>

            </div>

            <!-- Botón Ionic -->
            <ion-button
              id="convertir"
              expand="block"
              class="convert-button"
            >
              Convertir a dólares
            </ion-button>

            <!-- Resultado -->
            <section
              class="result-card"
              aria-live="polite"
              aria-atomic="true"
            >

              <p class="result-label">
                Resultado en dólares
              </p>

              <h3 id="resultado">
                $0.00
              </h3>

              <p class="result-currency">
                Dólares estadounidenses (USD)
              </p>

            </section>

            <!-- Tipo de cambio -->
            <div class="exchange-info">

              <span>
                Tipo de cambio fijo
              </span>

              <strong>
                Q8.00 = $1.00
              </strong>

            </div>

          </div>

        </section>

        <!-- Pie de página -->
        <footer class="app-footer">
          DivisApp · Conversor de Divisas
        </footer>

      </main>

    </ion-content>
  </ion-app>
`;

// ========================================
// ELEMENTOS DEL CONVERSOR
// ========================================

const cantidadInput = document.querySelector('#quetzales');
const resultado = document.querySelector('#resultado');
const convertirButton = document.querySelector('#convertir');

// ========================================
// FUNCIÓN DE CONVERSIÓN
// ========================================

function convertirDivisas() {
  const valor = cantidadInput.value.trim();
  const quetzales = Number(valor);

  // Validación
  if (
    valor === '' ||
    !Number.isFinite(quetzales) ||
    quetzales < 0
  ) {
    resultado.textContent = 'Cantidad inválida';
    resultado.classList.add('result-error');
    return;
  }

  // Conversión
  const dolares = quetzales / TIPO_CAMBIO;

  // Formato del resultado
  resultado.textContent = dolares.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  resultado.classList.remove('result-error');
}

// ========================================
// EVENTOS
// ========================================

convertirButton.addEventListener('click', convertirDivisas);

cantidadInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    convertirDivisas();
    cantidadInput.blur();
  }
});