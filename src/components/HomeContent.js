import React from 'react'

export default function HomeContent() {
  return (
    <section className="container">
        <div className="columns features">
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Consultorias e Assessorias</h4>
                            <p>As melhores Consultorias atuantes no mercado. Garantia de conformidade com as normas Técnicas vigente no Brasil. Encontre aqui a Consultoria que melhor se enquadra na sua necessidade e tenha conformidade em seu processo operacional.</p>
                            <p><a href="/">Saiba mais</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                    <div className="card-content">
                        <div className="content">
                            <h4>Gestão de Normas</h4>
                            <p>Em conformidade com planejamento de ações que envolvam o uso correto e eficiente de recursos, descarte de sub-produtos do processo industrial no meio-ambiente, monitoramento de riscos de acidentes e suas consequências, etc.</p>
                            <p><a href="/">Saiba mais</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shady">
                     <div className="card-content">
                        <div className="content">
                            <h4>Gestão do Processo Industrial</h4>
                            <p>Processamento em nuvem, tecnologia de ponta livre e gratuita, gerando componentes reutilizáveis. Permite integrações através de troca de mensagens com os demais módulos e integração completa com soluções ERP de mercado.</p>
                            <p><a href="/">Saiba mais</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
