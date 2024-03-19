'use client'
import React, { useContext, useState } from "react";
import { Form, Modal, Select, Avatar, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserListsContext } from "@/context/AppProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

function InviteMember() {
  const [form] = Form.useForm();
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [value, setValue] = useState([]);
  const { userLists, members, setMembers } = useContext(UserListsContext);

  const handleClick = () => {
    setIsInviteMemberVisible((prev) => !prev);
  };

  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  const handleOK = () => {
    const memberCollection = collection(db, "member");
    value.forEach(async (valueId) => {
      const selectUser = userLists.find((user) => user.id === valueId);
      if (selectUser) {
        await addDoc(memberCollection, {
          email: selectUser.email,
          photoURL: selectUser.photoURL,
          displayName: selectUser.displayName,
        });
        setMembers([...members, selectUser]);
      }
    });
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  const filterMember = userLists?.filter(
    (user) => !members?.find((member) => member.email === user.email)
  );

  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => handleClick()}
        className="cursor-pointer border-solid border-[2px] p-1 rounded-md text-[12px] mr-3"
      >
        <FontAwesomeIcon className="mr-[2px]" icon={faUser} />
        <span>Tham Gia</span>
      </div>

      <Avatar.Group size="small" maxCount={2}>
        {members &&
          members.map((user) => (
            <Tooltip key={user.email} title={user.email}>
              <Avatar src={user.photoURL} />
            </Tooltip>
          ))}
      </Avatar.Group>
      <div>
        <Modal
          title="Mời thêm thành viên"
          open={isInviteMemberVisible}
          destroyOnClose
          onOk={handleOK}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            {filterMember && userLists && members ? (
              <Select
                mode="multiple"
                showSearch
                value={value}
                filterOption
                placeholder="Nhập tên thành viên"
                onChange={(newValue) => setValue(newValue)}
                style={{ width: "100%" }}
              >
                {filterMember.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    <Avatar size="small" src={user.photoURL}>
                      {user.photoURL
                        ? ""
                        : user.displayName.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {user.displayName}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <p>Loading...</p>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default InviteMember;