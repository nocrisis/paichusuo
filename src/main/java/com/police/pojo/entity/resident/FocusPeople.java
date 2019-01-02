package com.police.pojo.entity.resident;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.pojo.entity.BasePO;

public class FocusPeople extends BasePO {
    @JSONField(name = "residenName")
    String residenName;

    @JSONField(name = "residentId")
    String residentId;

    @JSONField(name = "residence")
    String residence;

    @JSONField(name = "focusReason`")
    String focusReason;

    public String getResidenName() {
        return residenName;
    }

    public void setResidenName(String residenName) {
        this.residenName = residenName;
    }

    public String getResidentId() {
        return residentId;
    }

    public void setResidentId(String residentId) {
        this.residentId = residentId;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }

    public String getFocusReason() {
        return focusReason;
    }

    public void setFocusReason(String focusReason) {
        this.focusReason = focusReason;
    }
}
