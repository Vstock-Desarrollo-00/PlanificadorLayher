import { ViewChild } from '@angular/core';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Utilidades } from '../../Utilidades/Utilidades';
import { DataGridConfig } from '../../Clases/DataGridConfig';

@Component({
  selector: 'app-cmp-data-grid',
  templateUrl: './cmp-data-grid.component.html',
  styleUrls: ['./cmp-data-grid.component.css']
})
export class CmpDataGridComponent implements OnInit {

  @Input() dgConfig: DataGridConfig;
  @Output() onDoubleClick_DataGrid = new EventEmitter<any>();
  @Output() onClick_DataGrid = new EventEmitter<any>();
  @Output() onContentReady_DataGrid = new EventEmitter<any>();
  @Output() onRowPrepared_DataGrid = new EventEmitter<any>();
  @Output() onKeyDown_DataGrid = new EventEmitter<any>();
  @Output() onRowUpdated_DataGrid = new EventEmitter<any>();

  
  @ViewChild('DataGrid', { static: false }) DataGrid: DxDataGridComponent;

  filtro: any;

  constructor() { }

  ngOnInit(): void { }

  public objSeleccionado(): any {

    if (this.DataGrid.instance.getSelectedRowsData() === undefined
      || this.DataGrid.instance.getSelectedRowsData() === null
      || this.DataGrid.instance.getSelectedRowsData().length === 0)
      return null;

    return this.DataGrid.instance.getSelectedRowsData()[0];
  }

  public seleccionarFila(valorIntroducido: string, columna: string): boolean {
    let filas = this.DataGrid.instance.getVisibleRows();
    if(Utilidades.ObjectNull(filas)) return false;

    
    let nroFila: number;
    let encontrado: boolean = false;
    filas.some((fila, index) => {
      for(let column in fila.data){
        if(column === columna && fila.data[column] === valorIntroducido){
          nroFila = index;
          encontrado = true;
          return true;
        }
      }
    });

    if(encontrado) {
      this.DataGrid.instance.selectRowsByIndexes([nroFila]);
      this.DataGrid.focusedRowIndex = nroFila;
      return true;
    } else {
      return false;
    }
  }

  public deseleccionarFila() {
    this.DataGrid.instance.selectRowsByIndexes([-1]);
    this.DataGrid.focusedRowIndex = -1;
  }

  public filtrar(filter){
    this.DataGrid.instance.clearFilter();
    this.filtro = filter;
  }

  public actualizarAltura(altura: number): void {
    this.dgConfig.alturaMaxima = altura;
  }

  public getScroll(): number {
    return this.DataGrid.instance.getScrollable().scrollOffset().top;
  }


}
