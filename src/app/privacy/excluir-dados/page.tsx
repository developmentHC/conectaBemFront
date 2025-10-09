export default function ExcluirDados() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Exclusão de Dados Pessoais
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Respeitamos seu direito à privacidade e o controle sobre seus
              dados pessoais. Se você deseja solicitar a exclusão de seus dados
              da nossa plataforma, siga as instruções abaixo.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Como solicitar a exclusão
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Envie um e-mail para:
                  </h3>
                  <p className="text-xl font-bold text-blue-900">
                    contatoprojsj@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Informações necessárias no e-mail:
            </h3>

            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li className="text-gray-700">
                <strong>Assunto:</strong> &quot;Solicitação de Exclusão de Dados
                - ConectaBem&quot;
              </li>
              <li className="text-gray-700">
                <strong>E-mail cadastrado:</strong> O endereço de e-mail
                utilizado em sua conta
              </li>
              <li className="text-gray-700">
                <strong>Nome completo:</strong> Como cadastrado na plataforma
              </li>
              <li className="text-gray-700">
                <strong>Motivo da exclusão:</strong> (Opcional) Ajuda-nos a
                melhorar nossos serviços
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Exemplo de e-mail:
            </h3>

            <div className="bg-gray-100 border rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Para:</strong> contatoprojsj@gmail.com
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Assunto:</strong> Solicitação de Exclusão de Dados -
                ConectaBem
              </p>
              <div className="border-t pt-2 mt-2">
                <p className="text-gray-700 text-sm">
                  Olá,
                  <br />
                  <br />
                  Solicito a exclusão completa dos meus dados pessoais da
                  plataforma ConectaBem.
                  <br />
                  <br />
                  <strong>E-mail cadastrado:</strong> meu.email@exemplo.com
                  <br />
                  <strong>Nome completo:</strong> João da Silva
                  <br />
                  <br />
                  Agradeço pela atenção.
                  <br />
                  <br />
                  Atenciosamente,
                  <br />
                  João da Silva
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Prazo de processamento:
            </h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                ⏰ Sua solicitação será processada em até{" "}
                <strong>30 dias úteis</strong> após o recebimento. Você receberá
                uma confirmação por e-mail quando a exclusão for concluída.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-red-800 mb-2">
                ⚠️ Importante:
              </h4>
              <p className="text-red-700">
                A exclusão dos dados é <strong>irreversível</strong>. Uma vez
                processada, não será possível recuperar seu perfil ou histórico
                na plataforma.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Para dúvidas sobre nossa política de privacidade ou o tratamento
                de dados, consulte nossa{" "}
                <a
                  href="/privacy/politica"
                  className="text-blue-600 hover:underline"
                >
                  Política de Privacidade
                </a>{" "}
                ou entre em contato conosco pelo mesmo e-mail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
