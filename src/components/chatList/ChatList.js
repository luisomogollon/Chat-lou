import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { getUsers } from '../../services'
import Modal from "../modal/Modal";
import "../modal/modal.css";
import { ChatRoomContext } from "../../context"

import swal from "sweetalert";

export default class ChatList extends Component {
  static contextType = ChatRoomContext
  allChatUsers = [];

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      allChats: this.allChatUsers
    };
  }

  toggle = () => {
    this.setState(prev => ({ ...prev, active: !this.state.active }));
  }

  async componentDidMount() {
    try {
      const payload = await getUsers();
      const { users } = payload;
      const chatUserList = users.map((user, index) => {
        const { firstName, lastName, _id } = user;
        return { name: `${firstName} ${lastName}`, user_id: _id, key: index, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" }
      });
      this.setState.allChats = chatUserList;
      this.setState(prev => ({ ...prev, allChats: chatUserList }))
    } catch (error) {
      console.log(error);
    }
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleComplaintSubmit = async (e) => {
    e.preventDefault();
    const payloadBody = {}
    for (const elem of e.target) {
      if (elem.name) {
        if (elem.name === 'file_64') {
          const imgBase = await this.getBase64(elem.files[0]);
          payloadBody[elem.name] = imgBase;
        } else {
          payloadBody[elem.name] = elem.value;
        }
        elem.value = '';
      }
      const Swal = require('sweetalert2')
      Swal.fire();



    }
    const { submitComplaint } = this.context;
    try {
      await submitComplaint(payloadBody)
      this.toggle();
      swal("¡Su denuncia ha sido procesada exitosamente!")
    } catch (error) {
      swal("archivo demasiado grande, max 50kb")
    }
  }
  render() {
    return (
      <div className="main__chatlist">
        <Modal active={this.state.active} toggle={this.toggle}>
          <form onSubmit={this.handleComplaintSubmit}>
            <div className="modal2" >
              <span>¡Denuncia el acoso!</span>
              <br />
              <br />
              <br />
              <br />
              <label htmlFor="description"> Descripción rapida </label>
              <input type="text" className="form-control" name="description" />
            </div>
            <br />
            <label htmlFor="file_64">Incluya Captura aqui.</label>
            <input type="file" name="file_64" />
            <button type="submit" className="btn2">Enviar</button>
          </form>
        </Modal>
        <button onClick={this.toggle} className="btn">
          <i className="fa fa-plus"></i>
          <div> Denunciar</div>
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                userId={item.user_id}
                key={item.key}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
