package com.kjb.uixs.ia;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IaService {
	
	private IaMapper mapper;
	
	@Autowired
	public IaService(SqlSession session) {
		this.mapper = session.getMapper(IaMapper.class);
	};
	
	
	public List<IaVO> iaList() {
		
		List<IaVO> list = mapper.iaList(); 
		
		return list;
	}
	
	public List<IaVO> selectRequestIa(String[] request_ias) {
		
		return mapper.selectRequestIa(request_ias);
	}
	
	public List<Map<String, String>> selectIaPathFromDB(String[] request_ias) {
		
		return mapper.selectIaPath(request_ias);
	}
	
	public List<IaVO> selectIaTreeFromDB(IaVO iaVo) {
		return mapper.selectIaTree(iaVo);
	}
	
	public List<IaVO> selectIaTreeForViewFromDB(IaVO iaVo) {
		return mapper.selectIaTreeForView(iaVo);
	}
	
	/**
	 * ia 상세검색 - ia 리스트에서 ia 상세내용 수정시 사용
	 * @param iaVo
	 * @return
	 */
	public IaVO selectIaOne(IaVO iaVo) {
		return mapper.selectIaOne(iaVo);
	}
	
	/**
	 * 화면목록 - 화면 경로 를 포함하여 조회
	 * @param iaVo
	 * @return
	 */
	public List<IaVO> selectIaTreeForViewFromDB2(IaVO iaVo) {
		return mapper.selectIaTreeForView2(iaVo);
	}
	
	public int selectMaxSortFromDB(IaVO iaVo) throws Exception {
		return mapper.selectMaxSort(iaVo);
	}
	
	public String addIaTreeToDB(IaVO iaVo) {
		mapper.insertIaTree(iaVo);
		
		return iaVo.getId();
	}
	
	public void updateIaTreeToDB(IaVO iaVo) {
		mapper.updateIaTree(iaVo);
	}
	
	public void deleteIaTreeToDB(String id) {
		mapper.deleteIaTree(id);
	}
	
	public void updateIaSortToDB(IaVO iaVo) {
		mapper.updateIaSort(iaVo);
	}
	
	public List<Map<String, Object>> selectRequestWorkForIaFromDB(Map<String, String> param) {
		return mapper.selectRequestWorkForIa(param);
	}
}
