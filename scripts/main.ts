import { series } from '../data/data.js';
import { Serie } from './Serie.js';

function renderSeriesTable(series: Serie[]): void {
  const tableBody = document.getElementById('seriesTable')!.getElementsByTagName('tbody')[0];

  // Limpiar el cuerpo de la tabla antes de llenarlo
  tableBody.innerHTML = '';

  // Llenar la tabla con las series
  series.forEach(serie => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${serie.id}</td>
      <td><a href="#" class="series-link">${serie.name}</a></td>
      <td>${serie.channel}</td>
      <td>${serie.seasons}</td>
    `;

    // Agregar evento de clic para mostrar los detalles de la serie
    row.addEventListener('click', () => {
      showSerieDetails(serie);
    });
  });

  // Calcular y mostrar el promedio de temporadas
  const averageSeasons = calculateAverageSeasons(series);
  const averageSeasonsElement = document.getElementById('average-seasons')!;
  averageSeasonsElement.innerHTML = `<strong>Seasons average: ${averageSeasons.toFixed(2)}</strong>`;
}

function calculateAverageSeasons(series: Serie[]): number {
  const totalSeasons = series.reduce((sum, serie) => sum + serie.seasons, 0);
  return totalSeasons / series.length;
}

function showSerieDetails(serie: Serie): void {
  const serieDetailsCard = document.getElementById('serie-details')!;
  serieDetailsCard.classList.remove('d-none');
  serieDetailsCard.innerHTML = `
    <img src="${serie.imageUrl}" class="card-img-top" alt="${serie.imageUrl}">
    <div class="card-body">
      <h5 class="card-title">${serie.name}</h5>
      <p class="card-text">${serie.description}</p>
      <a href="${serie.link}" class="card-link" target="_blank">${serie.link}</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSeriesTable(series);
});