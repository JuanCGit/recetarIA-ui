import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrl: './share-dialog.component.scss',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
})
export class ShareDialogComponent {
  #translate = inject(TranslateService);
  #toastService = inject(MessageService);
  pageTitle = input('');
  pageLink = input(window.location.href);
  closeDialog = output();

  copyLink() {
    navigator.clipboard.writeText(this.pageLink());
    this.closeDialog.emit();
    this.#toastService.add({
      summary: this.#translate.instant('RECIPE.LINK_COPIED'),
      detail: this.#translate.instant('RECIPE.LINK_COPIED_SUCCESSFULLY'),
      severity: 'success',
      closable: false,
      life: 2000,
    });
  }

  shareNative() {
    navigator.share({
      url: this.pageLink(),
      title: this.pageTitle() + ': ',
      text: '\n¿Quieres una receta como esta?\nSolo di lo que tienes en tu cocina y la IA hará el resto. 🧠🍝',
    });
  }

  shareOnFacebook() {
    const link = this.pageLink();
    const title = this.pageTitle();
    const text = `${title}: ${link}\n\n¿Quieres una receta como esta?\nSolo di lo que tienes en tu cocina y la IA hará el resto. 🧠🍝`;

    const fbUrl = [
      'https://www.facebook.com/sharer/sharer.php',
      `u=${encodeURIComponent(link)}`,
      `quote=${encodeURIComponent(text)}`,
    ]
      .join('?')
      .replace('?u=', '?u='); // join ensures only one “?” appears

    window.open(fbUrl, '_blank', 'top=150,left=400,width=450,height=550');
  }

  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly window = window;
}
