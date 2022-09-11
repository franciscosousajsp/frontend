import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/model/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';


@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
    dataAbertura: '',
    dataFechamento: ''
  }

  constructor(
    private chamadoService : ChamadoService,
    private toastservice:    ToastrService,
    private route:           ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.chamadoService.finById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
    }, ex =>{
      this.toastservice.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string{
    if(status == '0'){
      return "ABERTO  "
    }else if (status == '1') {
      return "EM ANDAMENTO"
    } else {
      return "ENCERRADO"
    }
  }

  retornaPrioridade(prioridade: any): string{
    if(prioridade == '0'){
      return "BAIXA"  
    }else if (prioridade == '1') {
      return  "MEDIA"
    } else {
      return "ALTA"
    }
  }
}

