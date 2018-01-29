

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   
 


 </head>
	<body  class="table-report">
 
		<table  border="1">
			<tr>
				<td colspan="8"><h2>Reporte Finaciero</h2></td>
			</tr>
		<tr></tr>
	</table>

{{$project->results}}
@foreach ($project->results as $result)

	@foreach ($result->products as $product)

		@foreach ( $product->budgetproducts as $budgetproduct )

		 		<table border="1" >

					<tr style="border: 1px solid black">
						<td><b>Resultado: </b> </td>
						<td colspan="2"><span>  {{ $result->titulo }} </span>
						</td>
						 
						<td valign="middle">Inicio: </td>
						<td>{{ $result->fecha_inicio }}</td>
						<td valign="middle">Fin: </td>
						<td>{{ $result->fecha_fin }}</td>
					</tr>

					<tr style="border: 1px solid black">
						<td><b>Producto:</b></td>
						<td colspan="6">
							 <span>  {{ $product->desc }}</span>
						</td>
					</tr>

					<tr  style="border: 1px solid black">
						<td><b>Rubro: </b></td>
						<td colspan="6">
							
							<span>  {{ $budgetproduct->budgets_desc->titulo }}  </span>
						</td>
					</tr>
					<tr  style="border: 1px solid black">
						<td><b>Rubro Descripción: </b></td>
						<td  colspan="6">
							
							<span>  {{ $budgetproduct->descripcion }} </span>
						</td>
					</tr>
				</table>
				 
 
			@if( count($budgetproduct->wallets)>0) 
				<table border="1">
					<tr>
						<th style="border: 1px solid black"  colspan="2">Descripción</th>
						<th style="border: 1px solid black" colspan="2">Documento Soporte</th>
						<th style="border: 1px solid black" colspan="2">Gasto</th>
						<th style="border: 1px solid black" colspan="2">tipo</th>
						 
					</tr>
				
				@foreach ( $budgetproduct->wallets as $wallet )
					<tr>
						<td style="border: 1px solid black" colspan="2">{{$wallet->desc}}</td>
						<td style="border: 1px solid black" colspan="2">{{$wallet->doc}}</td>
						<td style="border: 1px solid black" colspan="2">{{$wallet->cantidad}}</td>
						<td style="border: 1px solid black" colspan="2">{{$wallet->type}}</td>
					</tr>
				@endforeach	
				</table>

			@endif
			<tr></tr>
			 
		@endforeach	
	@endforeach	
@endforeach	
</body>
</html>