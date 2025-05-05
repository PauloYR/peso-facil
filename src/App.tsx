import { useEffect, useState } from 'react'

interface Item {
  nome: string;
  qtd: number;
  peso: number;
}

export default function App() {
  const [itens, setItens] = useState<Item[]>([])
  const [tipo, setTipo] = useState('')
  const [qtd, setQtd] = useState(1)
  const [maquina, setMaquina] = useState(11)
  const [detergRes, setDetergRes] = useState<null | {
    powderG: number
    powderMl: number
    liquidMl: number
  }>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)')
    setDark(match.matches)
    match.addEventListener('change', e => setDark(e.matches))
    return () => match.removeEventListener('change', e => setDark(e.matches))
  }, [])

  const toggleDark = () => setDark(prev => !prev)

  const opcoes = [
    { nome: 'Camiseta', peso: 150 },
    { nome: 'Camisa', peso: 250 },
    { nome: 'Calça de brim/jeans', peso: 800 },
    { nome: 'Calça infantil', peso: 400 },
    { nome: 'Moletom adulto', peso: 700 },
    { nome: 'Moletom infantil', peso: 500 },
    { nome: 'Pijama', peso: 400 },
    { nome: 'Fronha', peso: 120 },
    { nome: 'Lençol solteiro', peso: 500 },
    { nome: 'Lençol casal', peso: 800 },
    { nome: 'Colcha solteiro', peso: 1000 },
    { nome: 'Colcha casal', peso: 1300 },
    { nome: 'Toalha de rosto', peso: 200 },
    { nome: 'Toalha de banho', peso: 500 },
    { nome: 'Toalha de mesa', peso: 500 },
    { nome: 'Pano de prato', peso: 80 },
    { nome: 'Edredom solteiro', peso: 900 },
    { nome: 'Edredom casal', peso: 1800 },
  ]

  const adicionar = () => {
    if (!tipo || qtd < 1) return alert('Selecione tipo e quantidade válida.')
    const opc = opcoes.find(o => o.nome === tipo)
    if (!opc) return alert('Tipo de roupa inválido.')
    const pesoItem = opc.peso * qtd
    setItens([...itens, { nome: tipo, qtd, peso: pesoItem }])
  }

  const remover = (index: number) => {
    setItens(itens.filter((_, i) => i !== index))
  }

  const limpar = () => setItens([])

  const total = itens.reduce((sum, i) => sum + i.peso, 0)

  const formattedTotal = total >= 1000
    ? `${(total / 1000).toFixed(2)} kg`
    : `${total} g`

  const formatVolume = (ml: number) => ml >= 1000 ? `${(ml / 1000).toFixed(2)} L` : `${ml} mL`

  const calcularDetergente = () => {
    const fator = maquina / 11
    const powderG = 80 * fator
    const powderMl = 240 * fator
    const liquidMl = 100 * fator
    setDetergRes({ powderG, powderMl, liquidMl })
  }

  return (
    <div className={
      `${dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} min-h-screen flex items-center justify-center p-4`
    }>
      <div className={
        `${dark ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg rounded-2xl w-full max-w-lg p-6`
      }>
        <div className="relative mb-4">
          <h1 className="text-2xl font-bold text-center">PesoFácil</h1>
          <button
            onClick={toggleDark}
            className="absolute top-0 right-0 p-2 rounded-full border border-gray-400 dark:border-gray-600"
            title="Alternar tema"
          >
            {dark ? '🌞' : '🌙'}
          </button>
        </div>


        <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
          Adicione várias peças e veja o peso total
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de roupa</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white"
            >
              <option value="">Selecione...</option>
              {opcoes.map(o => (
                <option key={o.nome} value={o.nome}>
                  {o.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantidade</label>
            <input
              type="number"
              min="1"
              value={qtd}
              onChange={e => setQtd(+e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          <button
            onClick={adicionar}
            className="w-full bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition"
          >
            Adicionar Peça
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Itens adicionados</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-48 overflow-y-auto">
            {itens.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-2"
              >
                <span>
                  {item.nome} x {item.qtd} = {item.peso >= 1000 ? `${(item.peso / 1000).toFixed(2)} kg` : `${item.peso} g`}
                </span>
                <button
                  onClick={() => remover(idx)}
                  className="text-red-500 hover:text-red-700 pr-5"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <span className="text-xl font-semibold">Peso total: </span>
          <span className="text-xl font-semibold">{formattedTotal}</span>
        </div>

        <button
          onClick={limpar}
          className="mt-4 w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
        >
          Limpar Lista
        </button>

        <div className="mt-8 pt-6 border-t dark:border-gray-600">
          <h2 className="text-xl font-bold mb-4 text-center">Dosagem de Detergente</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Capacidade da máquina (kg)</label>
              <input
                type="number"
                min="1"
                value={maquina}
                onChange={e => setMaquina(+e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <button
              onClick={calcularDetergente}
              className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition"
            >
              Calcular Dosagem
            </button>
          </div>

          {detergRes && (
            <div className="mt-4 space-y-2 text-center">
              <p>Sabão em Pó OMO: {detergRes.powderG.toFixed(0)} g ({formatVolume(detergRes.powderMl)})</p>
              <p>Sabão Líquido OMO: {formatVolume(detergRes.liquidMl)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}