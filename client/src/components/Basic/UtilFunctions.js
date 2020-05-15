import valueInvesting from "../../images/value-investing.png";
import qualityInvesting from "../../images/quality-investing.png";
import ethicalInvesting from "../../images/ethical-investing.png";
import growthInvesting from "../../images/growth-investing.png";
import indexInvesting from "../../images/index-investing.png";
import {Card, ListGroup} from "react-bootstrap";
import React from "react";


export function getStrategyLogo(name) {
    let badge = null;

    switch (name) {
        case "Value":
            badge = valueInvesting;
            break;

        case "Quality":
            badge = qualityInvesting;
            break;

        case "Ethical":
            badge = ethicalInvesting;
            break;

        case "Growth":
            badge = growthInvesting;
            break;

        case "Index":
            badge = indexInvesting;
            break;
    }

    return badge;
}

export function getStockList(index, suggestions) {

    const renderTodos = suggestions.division[index].stock.map((s, index) => {
        return <ListGroup.Item key={index}>Ticker - {s.ticker}  Units - {s.units.toFixed(2)}</ListGroup.Item>
    });

    return <ListGroup>{renderTodos}</ListGroup>
}

export function getPortfolioCard(name, index, suggestions=null) {
    return <Card style={{width: '22rem'}} key={index}>
        <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top" src={getStrategyLogo(name)}/>

        <Card.Body>
            <Card.Title>Strategy {index + 1} - {name}</Card.Title>
            <Card.Text>
                <b>Stock/ETF list</b>
                {suggestions !== null && getStockList(index, suggestions)}
            </Card.Text>
        </Card.Body>
    </Card>
}

