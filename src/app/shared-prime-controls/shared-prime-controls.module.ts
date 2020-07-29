import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TabMenuModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    ListboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
  ],
  exports: [
    ButtonModule,
    TabMenuModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    ListboxModule,
    CardModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedPrimeControlsModule {}
