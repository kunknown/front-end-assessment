import './App.css'
import Card from './components/card'
import CardGrid from './components/card-grid'
import Header from './components/header'

const App = () => (
    <div className="container">
      <Header />
      <CardGrid>
        <Card value={1}/>
        <Card value={2}/>
        <Card value={2}/>
        <Card value={1}/>
        <Card value={1}/>
        <Card value={2}/>
        <Card value={2}/>
        <Card value={1}/>
        <Card value={1}/>
        <Card value={2}/>
        <Card value={2}/>
        <Card value={1}/>
        <Card value={1}/>
        <Card value={2}/>
        <Card value={2}/>
        <Card value={1}/>
      </CardGrid>
    </div>
)

export default App
