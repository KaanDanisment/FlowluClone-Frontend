import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  onMouseMove(event: MouseEvent): void {
    const tableContainer = event.currentTarget as HTMLElement;
    const boundingRect = tableContainer.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;

    const scrollThreshold = 100; // Scroll başlama mesafesi
    const scrollAmount = 10; // Scroll miktarı

    if (mouseX < scrollThreshold) {
      // Sol tarafa kaydır
      tableContainer.scrollLeft -= scrollAmount;
    } else if (mouseX > boundingRect.width - scrollThreshold) {
      // Sağ tarafa kaydır
      tableContainer.scrollLeft += scrollAmount;
    }
  }
}
