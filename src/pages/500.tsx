
export default function Custom500() {
  return (
    <main style={{minHeight:'100dvh',display:'grid',placeItems:'center',padding:32,textAlign:'center'}}>
      <div>
        <h1 style={{fontSize:24,fontWeight:600}}>Erro interno (500)</h1>
        <p style={{opacity:.7,marginTop:8}}>Tente novamente em instantes.</p>
      </div>
    </main>
  );
}

