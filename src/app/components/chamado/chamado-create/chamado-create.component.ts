import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/model/chamado';
import { Cliente } from 'src/app/model/cliente';
import { Tecnico } from 'src/app/model/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';




@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

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

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService : ChamadoService,
    private clienteService : ClienteService,
    private tecnicoService : TecnicoService,
    private toastservice:    ToastrService,
    private router:          Router
  ) { }

  ngOnInit(): void {
    this.findAllCliente();
    this.findAllTecnico();
  }

  create(): void{
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastservice.success('Chamado criado com sucesso',"Novo Chamado")
      this.router.navigate(['chamados'])
    }, ex => {
      this.toastservice.error(ex.error.error);
    })
  }

  findAllCliente(): void{
    this.clienteService.findall().subscribe(resposta =>{
      this.clientes = resposta;
    })
  }

findAllTecnico(): void{
  this.tecnicoService.findall().subscribe(resposta => {
    this.tecnicos = resposta;
  })
}

  validaCampos(): boolean{
    return this.prioridade.valid && this.status.valid &&
           this.titulo.valid && this.observacoes.valid &&
           this.tecnico.valid && this.cliente.valid       
  }
}
