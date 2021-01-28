import React, { useCallback } from "react";
import addImage from "../../assets/Images/addImage.svg";
import styled from "styled-components";
import { storage } from "../../firebase/index";
import { ImagePreview } from "./index";

export const AddImage: React.FC = (props) => {
  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = props.images.filter((image) => image.id !== id);
        props.setImages(newImages);
        return storage.ref("images").child(id).delete();
      }
    },
    [props.images]
  );

  //再レンダー防止=>setImageの変更があったときのみ
  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      //16桁のランダム数列の生成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages((prevState) => [...prevState, newImage]);
        });
      });
    },
    [props.setImages]
  );

  return (
    <div>
      <div>
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview
              key={image.id}
              id={image.id}
              path={image.path}
              delete={deleteImage}
            />
          ))}
      </div>
      <StyledContainer>
        <span>ポイント参考画像の登録</span>
        <StyledWrapImageButton>
          <label>
            <img src={addImage} alt="icon" />
            <StyledAddFile
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </StyledWrapImageButton>
      </StyledContainer>
    </div>
  );
};

const StyledContainer = styled.div`
  display: flex;
  margin: 10px;
  span {
    display: grid;
    place-items: center;
    padding: 0 15px 0 15px;
  }
`;

const StyledAddFile = styled.input`
  display: none;
`;

const StyledWrapImageButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  opacity: 0.5;
  outline: none;
  :hover {
    opacity: 0.2;
  }
  img {
    cursor: pointer;
  }
`;
