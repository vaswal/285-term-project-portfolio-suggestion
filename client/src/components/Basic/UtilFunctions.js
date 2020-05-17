import valueInvesting from "../../images/value-investing.png";
import qualityInvesting from "../../images/quality-investing.png";
import ethicalInvesting from "../../images/ethical-investing.png";
import growthInvesting from "../../images/growth-investing.png";
import indexInvesting from "../../images/index-investing.png";
import {Badge, Card, ListGroup} from "react-bootstrap";
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

const getOrderStatusBadge = (status) => {
    let badge = null;

    switch (status) {
        case "Ticker":
            badge = <Badge style={{fontSize: 12}} variant="primary">{status}</Badge>;
            break;

        case "Units":
            badge = <Badge style={{fontSize: 12}} variant="info">{status}</Badge>;
            break;

        case "Description":
            badge = <Badge style={{fontSize: 12}} variant="dark">{status}</Badge>;
            break;

        case "Website":
            badge = <Badge style={{fontSize: 12}} variant="success">{status}</Badge>;
            break;

        case "Name":
            badge = <Badge style={{fontSize: 12}} variant="danger">{status}</Badge>;
            break;

        case "Warning":
            badge = <Badge style={{fontSize: 12}} variant="warning">{status}</Badge>;
            break;
    }

    return badge;
};

export function getStockList(index, division, portfolioInfo, isBasic) {
    console.log("getStockList")
    console.log(division)

    let renderTodos;

    if (isBasic) {
        renderTodos = division[index].stock.map((s, index) => {
            return <ListGroup.Item key={index}>
                {getOrderStatusBadge("Ticker")} - {s.ticker}
                <br/>
                {getOrderStatusBadge("Units")} - {s.units.toFixed(2)}</ListGroup.Item>
        });
    } else {
        console.log("portfolioInfo.filter")
        //console.log(portfolioInfo.filter(p => p.symbol === "DSI")[0].profile.description)
        if (portfolioInfo === null) return

        renderTodos = division[index].stock.map((s, index) => {
            return <ListGroup.Item key={index}>
                <img src={portfolioInfo.filter(p => p.symbol === s.ticker)[0].profile.image}/>
                <br/>
                {getOrderStatusBadge("Name")} - {portfolioInfo.filter(p => p.symbol === s.ticker)[0].profile.companyName}
                <br/>
                {getOrderStatusBadge("Ticker")} - {s.ticker}
                <br/>
                {getOrderStatusBadge("Units")} - {s.units.toFixed(2)}
                <br/>
                {getOrderStatusBadge("Description")} - {portfolioInfo.filter(p => p.symbol === s.ticker)[0].profile.description}
                <br/>
                {getOrderStatusBadge("Website")} - <a
                href={portfolioInfo.filter(p => p.symbol === s.ticker)[0].profile.website}>{portfolioInfo.filter(p => p.symbol === s.ticker)[0].profile.website}</a>
            </ListGroup.Item>
        });
    }

    return <ListGroup>{renderTodos}</ListGroup>
}

export function getPortfolioCard(name, index, suggestions = null, division = null, portfolioInfo = null, isBasic = null) {
    return <Card style={{width: '30rem', marginLeft: "5%"}} key={index}>
        <Card.Img style={{width: '10rem', alignSelf: "center"}} variant="top" src={getStrategyLogo(name)}/>

        <Card.Body>
            <Card.Title>Strategy {index + 1} - {name}</Card.Title>
            <Card.Text>

                {suggestions !== null && <b>Stock/ETF list</b> && getStockList(index, division, portfolioInfo, isBasic)}

            </Card.Text>
        </Card.Body>
    </Card>
}

